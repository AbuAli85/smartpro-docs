import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, FileText, ChevronRight, Star, TrendingUp } from 'lucide-react';
import { 
  LETTER_TEMPLATES, 
  getCategories, 
  getTemplatesByCategory,
  searchTemplates,
  CATEGORY_LABELS,
  type LetterTemplate 
} from '@/config/letterTemplates';

interface TemplateBrowserProps {
  onSelectTemplate: (template: LetterTemplate) => void;
  selectedTemplateId?: string;
}

export function TemplateBrowser({ onSelectTemplate, selectedTemplateId }: TemplateBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = getCategories();
  const filteredTemplates = searchQuery
    ? searchTemplates(searchQuery)
    : selectedCategory === 'all'
    ? LETTER_TEMPLATES
    : getTemplatesByCategory(selectedCategory);

  // Get popular templates (first 3)
  const popularTemplates = LETTER_TEMPLATES.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search templates... (e.g., 'salary', 'NOC', 'bank')"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-6 text-base border-2 focus:border-blue-500"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{LETTER_TEMPLATES.length}</div>
            <div className="text-sm text-blue-700 font-medium">Total Templates</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{categories.length}</div>
            <div className="text-sm text-green-700 font-medium">Categories</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">2</div>
            <div className="text-sm text-purple-700 font-medium">Languages</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-amber-600">∞</div>
            <div className="text-sm text-amber-700 font-medium">Customizable</div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Templates */}
      {!searchQuery && selectedCategory === 'all' && (
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
              Most Popular Templates
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {popularTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => onSelectTemplate(template)}
                className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{template.icon}</div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-yellow-700">
                      {template.name}
                    </div>
                    <div className="text-sm text-gray-600">{template.description}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-600" />
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('all')}
          size="sm"
          className="rounded-full"
        >
          All Templates ({LETTER_TEMPLATES.length})
        </Button>
        {categories.map((category) => {
          const label = CATEGORY_LABELS[category];
          const count = getTemplatesByCategory(category).length;
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              size="sm"
              className="rounded-full gap-1"
            >
              <span>{label?.icon}</span>
              <span>{label?.en} ({count})</span>
            </Button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredTemplates.length === 0 ? (
          <Card className="md:col-span-2">
            <CardContent className="p-12 text-center text-gray-500">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No templates found</p>
              <p className="text-sm">Try a different search term or category</p>
            </CardContent>
          </Card>
        ) : (
          filteredTemplates.map((template) => {
            const categoryLabel = CATEGORY_LABELS[template.category];
            const isSelected = template.id === selectedTemplateId;
            
            return (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected
                    ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50'
                    : 'hover:border-blue-300'
                }`}
                onClick={() => onSelectTemplate(template)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{template.icon}</div>
                      <div>
                        <CardTitle className="text-lg leading-tight mb-1">
                          {template.name}
                        </CardTitle>
                        <div className="text-sm text-gray-600 font-arabic">
                          {template.nameAr}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="bg-blue-500 text-white p-1 rounded-full">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="gap-1">
                      <span>{categoryLabel?.icon}</span>
                      <span className="text-xs">{categoryLabel?.en}</span>
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {template.fields.length} fields
                    </Badge>
                    {template.tags && template.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        Bilingual
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Professional
                      </span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                      Use Template →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Help Text */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Need a Custom Template?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Can't find the letter you need? Our template system is fully customizable! 
                You can easily add new letter types by editing a simple configuration file.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild>
                  <a href="/LETTER_TEMPLATES_GUIDE.md" target="_blank">
                    📖 View Guide
                  </a>
                </Button>
                <Button size="sm" variant="outline">
                  💡 Request Template
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

