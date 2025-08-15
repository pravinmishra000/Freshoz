import type { Category } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <a href={`/category/${category.slug}`} className="group block">
      <Card className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-1 group-hover:shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-4 text-center">
          <div className="mb-2 rounded-full bg-primary/10 p-3 transition-colors duration-300 group-hover:bg-primary">
            <category.icon className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
          </div>
          <span className="text-sm font-medium">{category.name_en}</span>
        </CardContent>
      </Card>
    </a>
  );
}
