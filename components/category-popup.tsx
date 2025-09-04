
'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { categories } from '@/lib/data';
import { CategoryCard } from './category-card';

interface CategoryPopupProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export default function CategoryPopup({ isOpen, onOpenChange }: CategoryPopupProps) {

  const handleLinkClick = () => {
    onOpenChange(false);
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-lg">
        <SheetHeader>
          <SheetTitle className="mb-4 text-center">Shop by Category</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-3 gap-4" onClick={handleLinkClick}>
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
