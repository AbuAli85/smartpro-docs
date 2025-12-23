#!/usr/bin/env python3
"""
Migrate Data Between Separate Supabase Projects
================================================
This script migrates data from OLD Supabase project to NEW unified Supabase project.

Requirements:
    pip install psycopg2-binary python-dotenv

Usage:
    1. Create a .env file with both database connection strings
    2. Run: python migrate_between_projects.py
"""

import os
import sys
import psycopg2
from psycopg2.extras import execute_values, RealDictCursor
from psycopg2 import sql
from dotenv import load_dotenv
from uuid import UUID
from datetime import datetime
import json

# Load environment variables
load_dotenv()

# Database connection strings
OLD_PROJECT_DB_URL = os.getenv('OLD_PROJECT_DB_URL')  # Old Supabase project
NEW_PROJECT_DB_URL = os.getenv('NEW_PROJECT_DB_URL')  # New unified Supabase project

class CrossProjectMigrator:
    def __init__(self):
        self.old_conn = None
        self.new_conn = None
        
        # ID mapping tables (for foreign key references)
        self.profile_id_map = {}  # old_id -> new_id (usually same, but just in case)
        self.company_id_map = {}
        
    def connect(self):
        """Connect to both Supabase projects"""
        print("🔌 Connecting to Supabase projects...")
        
        try:
            if OLD_PROJECT_DB_URL:
                self.old_conn = psycopg2.connect(OLD_PROJECT_DB_URL)
                print("✅ Connected to OLD Supabase project")
            else:
                print("❌ OLD_PROJECT_DB_URL is required!")
                sys.exit(1)
                
            if NEW_PROJECT_DB_URL:
                self.new_conn = psycopg2.connect(NEW_PROJECT_DB_URL)
                print("✅ Connected to NEW unified Supabase project")
            else:
                print("❌ NEW_PROJECT_DB_URL is required!")
                sys.exit(1)
                
        except Exception as e:
            print(f"❌ Connection error: {e}")
            sys.exit(1)
    
    def close(self):
        """Close database connections"""
        if self.old_conn:
            self.old_conn.close()
        if self.new_conn:
            self.new_conn.close()
    
    def migrate_profiles(self):
        """Migrate profiles from old project to new project"""
        print("\n📋 Migrating profiles...")
        
        with self.old_conn.cursor(cursor_factory=RealDictCursor) as old_cur:
            old_cur.execute("""
                SELECT 
                    id,
                    email,
                    COALESCE(full_name, CONCAT(first_name, ' ', last_name), split_part(email, '@', 1)) AS full_name,
                    phone,
                    COALESCE(avatar_url, profile_image_url) AS avatar_url,
                    COALESCE(company_name, company) AS company_name,
                    country,
                    COALESCE(is_verified, false) AS is_verified,
                    CASE 
                        WHEN role = 'promoter' THEN 'provider'
                        WHEN role = 'user' THEN 'client'
                        ELSE COALESCE(role, 'client')
                    END AS role,
                    CASE 
                        WHEN status = 'pending' THEN 'active'
                        WHEN status = 'approved' THEN 'active'
                        WHEN status = 'suspended' THEN 'suspended'
                        WHEN status = 'deleted' THEN 'inactive'
                        ELSE 'active'
                    END AS status,
                    created_at,
                    updated_at
                FROM profiles
            """)
            
            profiles = old_cur.fetchall()
            total_migrated = 0
            
            for profile in profiles:
                old_id = profile['id']
                
                with self.new_conn.cursor(cursor_factory=RealDictCursor) as new_cur:
                    # Check if profile exists
                    new_cur.execute("SELECT id FROM profiles WHERE id = %s", (old_id,))
                    existing = new_cur.fetchone()
                    
                    if existing:
                        # Update existing
                        new_cur.execute("""
                            UPDATE profiles SET
                                email = %s,
                                full_name = COALESCE(profiles.full_name, %s),
                                name = COALESCE(profiles.name, %s),
                                phone = COALESCE(profiles.phone, %s),
                                avatar_url = COALESCE(profiles.avatar_url, %s),
                                company_name = COALESCE(profiles.company_name, %s),
                                country = COALESCE(profiles.country, %s),
                                is_verified = COALESCE(profiles.is_verified, %s),
                                role = %s,
                                status = %s::user_status_type,
                                updated_at = GREATEST(profiles.updated_at, %s)
                            WHERE id = %s
                        """, (
                            profile['email'],
                            profile['full_name'],
                            profile['full_name'],
                            profile['phone'],
                            profile['avatar_url'],
                            profile['company_name'],
                            profile['country'],
                            profile['is_verified'],
                            profile['role'],
                            profile['status'],
                            profile['updated_at'],
                            old_id
                        ))
                    else:
                        # Insert new
                        new_cur.execute("""
                            INSERT INTO profiles (
                                id, email, full_name, name, phone, avatar_url,
                                company_name, country, is_verified, role, status,
                                created_at, updated_at
                            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s::user_status_type, %s, %s)
                            ON CONFLICT (id) DO UPDATE SET
                                email = EXCLUDED.email,
                                full_name = COALESCE(profiles.full_name, EXCLUDED.full_name),
                                role = EXCLUDED.role
                        """, (
                            old_id,
                            profile['email'],
                            profile['full_name'],
                            profile['full_name'],
                            profile['phone'],
                            profile['avatar_url'],
                            profile['company_name'],
                            profile['country'],
                            profile['is_verified'],
                            profile['role'],
                            profile['status'],
                            profile['created_at'],
                            profile['updated_at']
                        ))
                    
                    self.new_conn.commit()
                    self.profile_id_map[old_id] = old_id  # Usually same ID
                    total_migrated += 1
        
        print(f"✅ Migrated {total_migrated} profiles")
    
    def migrate_companies(self):
        """Migrate companies from old project to new project"""
        print("\n🏢 Migrating companies...")
        
        with self.old_conn.cursor(cursor_factory=RealDictCursor) as old_cur:
            old_cur.execute("""
                SELECT 
                    id,
                    name,
                    COALESCE(slug, LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))) AS slug,
                    description,
                    logo_url,
                    website,
                    email,
                    phone,
                    address,
                    cr_number,
                    vat_number,
                    owner_id,
                    CASE 
                        WHEN COALESCE(is_active, true) THEN 'active'
                        ELSE 'inactive'
                    END AS status,
                    created_at,
                    updated_at
                FROM companies
            """)
            
            companies = old_cur.fetchall()
            total_migrated = 0
            
            for company in companies:
                old_id = company['id']
                
                with self.new_conn.cursor(cursor_factory=RealDictCursor) as new_cur:
                    # Check if company exists
                    new_cur.execute("SELECT id FROM companies WHERE id = %s OR slug = %s", 
                                   (old_id, company['slug']))
                    existing = new_cur.fetchone()
                    
                    if existing:
                        # Update existing
                        new_cur.execute("""
                            UPDATE companies SET
                                name = %s,
                                description = COALESCE(companies.description, %s),
                                logo_url = COALESCE(companies.logo_url, %s),
                                website = COALESCE(companies.website, %s),
                                email = COALESCE(companies.email, %s),
                                phone = COALESCE(companies.phone, %s),
                                address = COALESCE(companies.address, %s),
                                cr_number = COALESCE(companies.cr_number, %s),
                                vat_number = COALESCE(companies.vat_number, %s),
                                status = %s
                            WHERE id = %s
                        """, (
                            company['name'],
                            company['description'],
                            company['logo_url'],
                            company['website'],
                            company['email'],
                            company['phone'],
                            company['address'],
                            company['cr_number'],
                            company['vat_number'],
                            company['status'],
                            old_id
                        ))
                    else:
                        # Insert new
                        new_cur.execute("""
                            INSERT INTO companies (
                                id, name, slug, description, logo_url, website,
                                email, phone, address, cr_number, vat_number,
                                owner_id, status, created_at, updated_at
                            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                            ON CONFLICT (id) DO UPDATE SET
                                name = EXCLUDED.name,
                                slug = EXCLUDED.slug
                        """, (
                            old_id,
                            company['name'],
                            company['slug'],
                            company['description'],
                            company['logo_url'],
                            company['website'],
                            company['email'],
                            company['phone'],
                            company['address'],
                            company['cr_number'],
                            company['vat_number'],
                            company['owner_id'],
                            company['status'],
                            company['created_at'],
                            company['updated_at']
                        ))
                    
                    self.new_conn.commit()
                    self.company_id_map[old_id] = old_id
                    total_migrated += 1
        
        print(f"✅ Migrated {total_migrated} companies")
    
    def migrate_services(self):
        """Migrate services from old project to new project"""
        print("\n🔧 Migrating services...")
        
        with self.old_conn.cursor(cursor_factory=RealDictCursor) as old_cur:
            # First check which columns exist
            old_cur.execute("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'services' 
                AND column_name IN ('company_id', 'provider_company_id')
            """)
            company_cols = [row[0] for row in old_cur.fetchall()]
            
            # Build query based on available columns
            if 'provider_company_id' in company_cols:
                company_col_expr = 'provider_company_id'
            elif 'company_id' in company_cols:
                company_col_expr = 'company_id'
            else:
                company_col_expr = 'NULL'
            
            query = f"""
                SELECT 
                    id,
                    provider_id,
                    {company_col_expr} AS provider_company_id,
                    COALESCE(title, name) AS title,
                    description,
                    category,
                    COALESCE(price, base_price, price_base, 0) AS price,
                    COALESCE(currency, price_currency, 'USD') AS currency,
                    location,
                    tags,
                    requirements,
                    cover_image_url,
                    COALESCE(featured, is_featured, false) AS featured,
                    COALESCE(rating, 0) AS rating,
                    COALESCE(review_count, 0) AS review_count,
                    COALESCE(booking_count, 0) AS booking_count,
                    CASE 
                        WHEN status = 'active' AND COALESCE(approval_status, 'approved') = 'approved' THEN 'active'
                        WHEN status = 'pending' OR approval_status = 'pending' THEN 'pending'
                        WHEN status = 'inactive' OR status = 'archived' THEN 'inactive'
                        WHEN status = 'draft' THEN 'draft'
                        ELSE 'active'
                    END AS status,
                    created_at,
                    updated_at
                FROM services
            """
            
            old_cur.execute(query)
            
            services = old_cur.fetchall()
            total_migrated = 0
            
            for service in services:
                # Map provider_id and company_id
                provider_id = self.profile_id_map.get(service['provider_id'], service['provider_id'])
                company_id = service.get('provider_company_id')
                if company_id:
                    company_id = self.company_id_map.get(company_id, company_id)
                
                with self.new_conn.cursor() as new_cur:
                    new_cur.execute("""
                        INSERT INTO services (
                            id, provider_id, provider_company_id, title, description,
                            category, price, currency, location, tags, requirements,
                            cover_image_url, featured, rating, review_count, booking_count,
                            status, created_at, updated_at
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s::service_status_type, %s, %s)
                        ON CONFLICT (id) DO UPDATE SET
                            title = EXCLUDED.title,
                            description = EXCLUDED.description,
                            price = EXCLUDED.price,
                            status = EXCLUDED.status
                    """, (
                        service['id'],
                        provider_id,
                        company_id,
                        service['title'],
                        service['description'],
                        service['category'],
                        service['price'],
                        service['currency'],
                        service['location'],
                        service['tags'],
                        service['requirements'],
                        service['cover_image_url'],
                        service['featured'],
                        service['rating'],
                        service['review_count'],
                        service['booking_count'],
                        service['status'],
                        service['created_at'],
                        service['updated_at']
                    ))
                    
                    self.new_conn.commit()
                    total_migrated += 1
        
        print(f"✅ Migrated {total_migrated} services")
    
    def migrate_bookings(self):
        """Migrate bookings from old project to new project"""
        print("\n📅 Migrating bookings...")
        
        with self.old_conn.cursor(cursor_factory=RealDictCursor) as old_cur:
            old_cur.execute("""
                SELECT 
                    id,
                    COALESCE(client_id, user_id) AS client_id,
                    provider_id,
                    provider_company_id,
                    service_id,
                    package_id,
                    CASE 
                        WHEN status = 'approved' THEN 'confirmed'
                        WHEN status = 'pending' THEN 'pending'
                        WHEN status = 'in_progress' THEN 'in_progress'
                        WHEN status = 'completed' THEN 'completed'
                        WHEN status = 'cancelled' THEN 'cancelled'
                        WHEN status = 'declined' THEN 'cancelled'
                        WHEN status = 'confirmed' THEN 'confirmed'
                        WHEN status = 'draft' THEN 'draft'
                        ELSE 'pending'
                    END AS status,
                    COALESCE(scheduled_at, scheduled_start, start_time) AS scheduled_at,
                    created_at,
                    updated_at
                FROM bookings
            """)
            
            bookings = old_cur.fetchall()
            total_migrated = 0
            
            for booking in bookings:
                # Map IDs
                client_id = self.profile_id_map.get(booking['client_id'], booking['client_id'])
                provider_id = self.profile_id_map.get(booking['provider_id'], booking['provider_id'])
                company_id = self.company_id_map.get(booking['provider_company_id'], booking['provider_company_id'])
                
                with self.new_conn.cursor() as new_cur:
                    new_cur.execute("""
                        INSERT INTO bookings (
                            id, client_id, provider_id, provider_company_id,
                            service_id, package_id, status, scheduled_at,
                            created_at, updated_at
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s::booking_status_type, %s, %s, %s)
                        ON CONFLICT (id) DO UPDATE SET
                            client_id = EXCLUDED.client_id,
                            provider_id = EXCLUDED.provider_id,
                            service_id = EXCLUDED.service_id,
                            status = EXCLUDED.status
                    """, (
                        booking['id'],
                        client_id,
                        provider_id,
                        company_id,
                        booking['service_id'],
                        booking['package_id'],
                        booking['status'],
                        booking['scheduled_at'],
                        booking['created_at'],
                        booking['updated_at']
                    ))
                    
                    self.new_conn.commit()
                    total_migrated += 1
        
        print(f"✅ Migrated {total_migrated} bookings")
    
    def assign_rbac_roles(self):
        """Assign RBAC roles in new project"""
        print("\n🔐 Assigning RBAC roles...")
        
        with self.new_conn.cursor() as cur:
            # Admin
            cur.execute("""
                INSERT INTO user_role_assignments (user_id, role_id)
                SELECT p.id, r.id
                FROM profiles p
                CROSS JOIN roles r
                WHERE p.role = 'admin' AND r.name = 'admin'
                ON CONFLICT DO NOTHING
            """)
            
            # Provider
            cur.execute("""
                INSERT INTO user_role_assignments (user_id, role_id)
                SELECT p.id, r.id
                FROM profiles p
                CROSS JOIN roles r
                WHERE p.role = 'provider' AND r.name = 'provider'
                ON CONFLICT DO NOTHING
            """)
            
            # Client
            cur.execute("""
                INSERT INTO user_role_assignments (user_id, role_id)
                SELECT p.id, r.id
                FROM profiles p
                CROSS JOIN roles r
                WHERE p.role = 'client' AND r.name = 'client'
                ON CONFLICT DO NOTHING
            """)
            
            self.new_conn.commit()
        
        print("✅ RBAC roles assigned")
    
    def refresh_materialized_view(self):
        """Refresh user_permissions materialized view"""
        print("\n🔄 Refreshing materialized view...")
        
        try:
            with self.new_conn.cursor() as cur:
                cur.execute("REFRESH MATERIALIZED VIEW user_permissions")
                self.new_conn.commit()
            print("✅ Materialized view refreshed")
        except Exception as e:
            print(f"⚠️  Could not refresh materialized view: {e}")
    
    def print_summary(self):
        """Print migration summary"""
        print("\n" + "="*50)
        print("📊 MIGRATION SUMMARY")
        print("="*50)
        
        with self.new_conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT COUNT(*) as count FROM profiles")
            profiles = cur.fetchone()['count']
            
            cur.execute("SELECT COUNT(*) as count FROM companies")
            companies = cur.fetchone()['count']
            
            cur.execute("SELECT COUNT(*) as count FROM services")
            services = cur.fetchone()['count']
            
            cur.execute("SELECT COUNT(*) as count FROM bookings")
            bookings = cur.fetchone()['count']
            
            print(f"✅ Profiles: {profiles}")
            print(f"✅ Companies: {companies}")
            print(f"✅ Services: {services}")
            print(f"✅ Bookings: {bookings}")
        
        print("="*50)
        print("\n🎉 Migration completed!")
        print("\nNext steps:")
        print("1. Run VERIFY_MIGRATION.sql in new project to verify data")
        print("2. Test your application with migrated data")

def main():
    """Main migration function"""
    print("🚀 Cross-Project Data Migration")
    print("="*50)
    
    migrator = CrossProjectMigrator()
    
    try:
        # Connect to both projects
        migrator.connect()
        
        # Migrate data
        migrator.migrate_profiles()
        migrator.migrate_companies()
        migrator.migrate_services()
        migrator.migrate_bookings()
        migrator.assign_rbac_roles()
        migrator.refresh_materialized_view()
        
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

