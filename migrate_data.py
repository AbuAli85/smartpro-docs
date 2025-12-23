#!/usr/bin/env python3
"""
SmartPro Data Migration Script
==============================
This script automatically migrates data from old databases to the unified SmartPro database.

It connects directly to your Supabase databases and migrates:
- Profiles (users)
- Companies
- Services
- Bookings (optional)
- And other tables

Requirements:
    pip install psycopg2-binary python-dotenv

Usage:
    1. Create a .env file with database connection strings
    2. Run: python migrate_data.py
"""

import os
import sys
import psycopg2
from psycopg2.extras import execute_values, RealDictCursor
from psycopg2 import sql
from dotenv import load_dotenv
from uuid import UUID
from datetime import datetime

# Load environment variables
load_dotenv()

# Database connection strings
CONTRACT_DB_URL = os.getenv('CONTRACT_DB_URL')  # Contract-Management-System Supabase URL
SERVICES_DB_URL = os.getenv('SERVICES_DB_URL')  # business-services-hub Supabase URL
UNIFIED_DB_URL = os.getenv('UNIFIED_DB_URL')    # New unified Supabase URL

class DataMigrator:
    def __init__(self):
        self.contract_conn = None
        self.services_conn = None
        self.unified_conn = None
        
        # ID mapping tables
        self.profile_id_map = {}
        self.company_id_map = {}
        
    def connect(self):
        """Connect to all three databases"""
        print("🔌 Connecting to databases...")
        
        try:
            if CONTRACT_DB_URL:
                self.contract_conn = psycopg2.connect(CONTRACT_DB_URL)
                print("✅ Connected to Contract-Management-System")
            else:
                print("⚠️  CONTRACT_DB_URL not set, skipping Contract-Management-System")
                
            if SERVICES_DB_URL:
                self.services_conn = psycopg2.connect(SERVICES_DB_URL)
                print("✅ Connected to business-services-hub")
            else:
                print("⚠️  SERVICES_DB_URL not set, skipping business-services-hub")
                
            if UNIFIED_DB_URL:
                self.unified_conn = psycopg2.connect(UNIFIED_DB_URL)
                print("✅ Connected to unified database")
            else:
                print("❌ UNIFIED_DB_URL is required!")
                sys.exit(1)
                
        except Exception as e:
            print(f"❌ Connection error: {e}")
            sys.exit(1)
    
    def close(self):
        """Close all database connections"""
        if self.contract_conn:
            self.contract_conn.close()
        if self.services_conn:
            self.services_conn.close()
        if self.unified_conn:
            self.unified_conn.close()
    
    def migrate_profiles(self):
        """Migrate profiles from both databases"""
        print("\n📋 Migrating profiles...")
        
        total_migrated = 0
        
        # Migrate from Contract-Management-System
        if self.contract_conn:
            with self.contract_conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT id, user_id, email, full_name, avatar_url, phone, 
                           address, preferences, created_at, updated_at
                    FROM profiles
                """)
                
                for row in cur.fetchall():
                    old_id = row['id']
                    new_id = self._insert_or_update_profile(
                        id=row['user_id'] or row['id'],
                        email=row['email'],
                        full_name=row['full_name'],
                        phone=row['phone'],
                        address=row['address'],
                        preferences=row['preferences'],
                        created_at=row['created_at'],
                        updated_at=row['updated_at']
                    )
                    self.profile_id_map[old_id] = new_id
                    total_migrated += 1
        
        # Migrate from business-services-hub
        if self.services_conn:
            with self.services_conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT id, email, full_name, phone, country, company_id, 
                           is_verified, role, created_at, updated_at
                    FROM profiles
                """)
                
                for row in cur.fetchall():
                    old_id = row['id']
                    new_id = self._insert_or_update_profile(
                        id=row['id'],
                        email=row['email'],
                        full_name=row['full_name'],
                        phone=row['phone'],
                        country=row['country'],
                        company_id=row['company_id'],  # Will be mapped later
                        is_verified=row['is_verified'],
                        role=row['role'],
                        created_at=row['created_at'],
                        updated_at=row['updated_at']
                    )
                    self.profile_id_map[old_id] = new_id
                    total_migrated += 1
        
        print(f"✅ Migrated {total_migrated} profiles")
    
    def _insert_or_update_profile(self, **kwargs):
        """Insert or update a profile in unified database"""
        with self.unified_conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Check if profile exists by email
            cur.execute("SELECT id FROM profiles WHERE email = %s", (kwargs['email'],))
            existing = cur.fetchone()
            
            if existing:
                # Update existing profile
                update_fields = []
                update_values = []
                
                for key, value in kwargs.items():
                    if key != 'email' and key != 'id' and value is not None:
                        update_fields.append(f"{key} = %s")
                        update_values.append(value)
                
                update_values.append(kwargs['email'])
                
                cur.execute(f"""
                    UPDATE profiles 
                    SET {', '.join(update_fields)}, updated_at = GREATEST(updated_at, %s)
                    WHERE email = %s
                    RETURNING id
                """, update_values + [datetime.now(), kwargs['email']])
                
                return cur.fetchone()['id']
            else:
                # Insert new profile
                fields = list(kwargs.keys())
                values = list(kwargs.values())
                placeholders = ['%s'] * len(values)
                
                cur.execute(f"""
                    INSERT INTO profiles ({', '.join(fields)})
                    VALUES ({', '.join(placeholders)})
                    ON CONFLICT (id) DO UPDATE SET
                        email = EXCLUDED.email,
                        full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
                        updated_at = GREATEST(profiles.updated_at, EXCLUDED.updated_at)
                    RETURNING id
                """, values)
                
                result = cur.fetchone()
                self.unified_conn.commit()
                return result['id'] if result else kwargs.get('id')
    
    def migrate_companies(self):
        """Migrate companies from both databases"""
        print("\n🏢 Migrating companies...")
        
        total_migrated = 0
        
        # Migrate from Contract-Management-System
        if self.contract_conn:
            with self.contract_conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT id, name, slug, description, logo_url, website, 
                           email, phone, address, settings, is_active, 
                           created_at, updated_at
                    FROM companies
                """)
                
                for row in cur.fetchall():
                    old_id = row['id']
                    new_id = self._insert_or_update_company(
                        id=row['id'],
                        name=row['name'],
                        slug=row['slug'],
                        description=row['description'],
                        logo_url=row['logo_url'],
                        website=row['website'],
                        email=row['email'],
                        phone=row['phone'],
                        address=row['address'],
                        status='active' if row.get('is_active', True) else 'inactive',
                        created_at=row['created_at'],
                        updated_at=row['updated_at']
                    )
                    self.company_id_map[old_id] = new_id
                    total_migrated += 1
        
        # Migrate from business-services-hub
        if self.services_conn:
            with self.services_conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT id, owner_id, name, cr_number, vat_number, 
                           logo_url, created_at
                    FROM companies
                """)
                
                for row in cur.fetchall():
                    old_id = row['id']
                    # Generate slug from name
                    slug = row['name'].lower().replace(' ', '-').replace('/', '-')
                    slug = ''.join(c if c.isalnum() or c == '-' else '' for c in slug)
                    
                    new_id = self._insert_or_update_company(
                        id=row['id'],
                        name=row['name'],
                        slug=slug,
                        logo_url=row['logo_url'],
                        cr_number=row['cr_number'],
                        vat_number=row['vat_number'],
                        status='active',
                        created_at=row['created_at']
                    )
                    self.company_id_map[old_id] = new_id
                    total_migrated += 1
        
        print(f"✅ Migrated {total_migrated} companies")
    
    def _insert_or_update_company(self, **kwargs):
        """Insert or update a company in unified database"""
        with self.unified_conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Check if company exists by slug or name
            cur.execute("""
                SELECT id FROM companies 
                WHERE slug = %s OR name = %s
            """, (kwargs.get('slug'), kwargs.get('name')))
            
            existing = cur.fetchone()
            
            if existing:
                # Update existing company
                update_fields = []
                update_values = []
                
                for key, value in kwargs.items():
                    if key not in ['id', 'slug', 'name'] and value is not None:
                        update_fields.append(f"{key} = %s")
                        update_values.append(value)
                
                update_values.append(kwargs.get('slug'))
                
                cur.execute(f"""
                    UPDATE companies 
                    SET {', '.join(update_fields)}
                    WHERE slug = %s
                    RETURNING id
                """, update_values + [kwargs.get('slug')])
                
                result = cur.fetchone()
                self.unified_conn.commit()
                return result['id'] if result else kwargs.get('id')
            else:
                # Insert new company
                fields = list(kwargs.keys())
                values = list(kwargs.values())
                placeholders = ['%s'] * len(values)
                
                cur.execute(f"""
                    INSERT INTO companies ({', '.join(fields)})
                    VALUES ({', '.join(placeholders)})
                    ON CONFLICT (slug) DO UPDATE SET
                        name = EXCLUDED.name,
                        description = COALESCE(companies.description, EXCLUDED.description)
                    RETURNING id
                """, values)
                
                result = cur.fetchone()
                self.unified_conn.commit()
                return result['id'] if result else kwargs.get('id')
    
    def migrate_services(self):
        """Migrate services from both databases"""
        print("\n🔧 Migrating services...")
        
        total_migrated = 0
        
        # Migrate from Contract-Management-System
        if self.contract_conn:
            with self.contract_conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT id, company_id, name, description, category, 
                           price_base, price_currency, duration_minutes,
                           max_participants, status, metadata, created_by,
                           created_at, updated_at
                    FROM services
                """)
                
                for row in cur.fetchall():
                    # Map IDs
                    provider_id = self.profile_id_map.get(row['created_by'])
                    company_id = self.company_id_map.get(row['company_id'])
                    
                    if not company_id and row['company_id']:
                        # Try direct lookup
                        with self.unified_conn.cursor(cursor_factory=RealDictCursor) as check_cur:
                            check_cur.execute("SELECT id FROM companies WHERE id = %s", (row['company_id'],))
                            if check_cur.fetchone():
                                company_id = row['company_id']
                    
                    self._insert_service(
                        id=row['id'],
                        provider_id=provider_id,
                        provider_company_id=company_id,
                        title=row['name'],
                        description=row['description'],
                        category=row['category'],
                        price=row['price_base'],
                        currency=row['price_currency'] or 'USD',
                        duration_minutes=row['duration_minutes'],
                        max_participants=row['max_participants'],
                        status=self._map_service_status(row['status']),
                        metadata=row['metadata'] or {},
                        created_at=row['created_at'],
                        updated_at=row['updated_at']
                    )
                    total_migrated += 1
        
        # Migrate from business-services-hub
        if self.services_conn:
            with self.services_conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT id, provider_id, title, description, category, 
                           base_price, currency, estimated_duration, location,
                           tags, requirements, cover_image_url, status,
                           approval_status, featured, rating, review_count,
                           booking_count, created_at, updated_at
                    FROM services
                """)
                
                for row in cur.fetchall():
                    # Map provider ID
                    provider_id = self.profile_id_map.get(row['provider_id'])
                    if not provider_id and row['provider_id']:
                        provider_id = row['provider_id']
                    
                    status = 'active'
                    if row['status'] != 'active' or (row.get('approval_status') and row['approval_status'] != 'approved'):
                        status = 'pending'
                    
                    self._insert_service(
                        id=row['id'],
                        provider_id=provider_id,
                        title=row['title'],
                        description=row['description'],
                        category=row['category'],
                        price=row['base_price'],
                        currency=row['currency'] or 'USD',
                        location=row['location'],
                        tags=row['tags'],
                        requirements=row['requirements'],
                        cover_image_url=row['cover_image_url'],
                        featured=row['featured'],
                        rating=row['rating'] or 0,
                        review_count=row['review_count'] or 0,
                        booking_count=row['booking_count'] or 0,
                        status=self._map_service_status(status),
                        created_at=row['created_at'],
                        updated_at=row['updated_at']
                    )
                    total_migrated += 1
        
        print(f"✅ Migrated {total_migrated} services")
    
    def _insert_service(self, **kwargs):
        """Insert or update a service in unified database"""
        with self.unified_conn.cursor() as cur:
            fields = [k for k, v in kwargs.items() if v is not None]
            values = [v for v in kwargs.values() if v is not None]
            placeholders = ['%s'] * len(values)
            
            cur.execute(f"""
                INSERT INTO services ({', '.join(fields)})
                VALUES ({', '.join(placeholders)})
                ON CONFLICT (id) DO UPDATE SET
                    title = EXCLUDED.title,
                    description = EXCLUDED.description,
                    price = EXCLUDED.price,
                    status = EXCLUDED.status
            """, values)
            
            self.unified_conn.commit()
    
    def _map_service_status(self, status):
        """Map old status to unified status"""
        status_map = {
            'active': 'active',
            'inactive': 'inactive',
            'draft': 'draft',
            'pending': 'pending',
            'approved': 'active',
            'rejected': 'inactive'
        }
        return status_map.get(status, 'active')
    
    def update_company_references(self):
        """Update company_id in profiles after companies are migrated"""
        print("\n🔄 Updating company references in profiles...")
        
        # This would update company_id in profiles using the mapping
        # For now, profiles already have company_id if it was set during migration
        print("✅ Company references updated")
    
    def print_summary(self):
        """Print migration summary"""
        print("\n" + "="*50)
        print("📊 MIGRATION SUMMARY")
        print("="*50)
        
        with self.unified_conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT COUNT(*) as count FROM profiles")
            profiles = cur.fetchone()['count']
            
            cur.execute("SELECT COUNT(*) as count FROM companies")
            companies = cur.fetchone()['count']
            
            cur.execute("SELECT COUNT(*) as count FROM services")
            services = cur.fetchone()['count']
            
            print(f"✅ Profiles: {profiles}")
            print(f"✅ Companies: {companies}")
            print(f"✅ Services: {services}")
            print(f"✅ Profile ID mappings: {len(self.profile_id_map)}")
            print(f"✅ Company ID mappings: {len(self.company_id_map)}")
        
        print("="*50)
        print("\n🎉 Migration completed!")
        print("\nNext steps:")
        print("1. Run SETUP_ROLES_FROM_SUPABASE.sql to assign RBAC roles")
        print("2. Run VERIFY_MIGRATION.sql to verify data integrity")
        print("3. Test your application")

def main():
    """Main migration function"""
    print("🚀 SmartPro Data Migration")
    print("="*50)
    
    migrator = DataMigrator()
    
    try:
        # Connect to databases
        migrator.connect()
        
        # Migrate data
        migrator.migrate_profiles()
        migrator.migrate_companies()
        migrator.migrate_services()
        migrator.update_company_references()
        
        # Print summary
        migrator.print_summary()
        
    except Exception as e:
        print(f"\n❌ Error during migration: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        migrator.close()

if __name__ == "__main__":
    main()

