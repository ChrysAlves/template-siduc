import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BreadcrumbsProps {
    path: string[];
    onNavigate: (index: number) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path, onNavigate }) => {
    return (
        <div className="flex items-center space-x-2 mb-4 text-sm">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate(-1)}
                className="p-1 h-auto text-blue-600 hover:text-blue-800"
            >

            </Button>

            {path.map((segment, index) => (
                <React.Fragment key={index}>
                    <ChevronRight size={14} className="text-gray-400" />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onNavigate(index)}
                        className="p-1 h-auto text-blue-600 hover:text-blue-800"
                    >
                        {segment}
                    </Button>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumbs;
