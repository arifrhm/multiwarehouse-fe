import React from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ProductFilter } from '@/types/product';

interface FilterSectionProps {
  filter: ProductFilter;
  setFilter: React.Dispatch<React.SetStateAction<ProductFilter>>;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ filter, setFilter }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={filter.category || ''}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          placeholder="Enter category"
        />
      </div>
      <div>
        <Label htmlFor="minPrice">Min Price</Label>
        <Input
          id="minPrice"
          type="number"
          value={filter.minPrice || ''}
          onChange={(e) => setFilter({ ...filter, minPrice: Number(e.target.value) })}
          placeholder="Enter min price"
        />
      </div>
      <div>
        <Label htmlFor="maxPrice">Max Price</Label>
        <Input
          id="maxPrice"
          type="number"
          value={filter.maxPrice || ''}
          onChange={(e) => setFilter({ ...filter, maxPrice: Number(e.target.value) })}
          placeholder="Enter max price"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={filter.inStock || false}
          onCheckedChange={(checked) => setFilter({ ...filter, inStock: checked as boolean })}
        />
        <Label htmlFor="inStock">In Stock</Label>
      </div>
    </div>
  );
};
