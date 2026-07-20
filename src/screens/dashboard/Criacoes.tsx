import { ImagePlus } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import type { View } from '../../types';

interface Props {
  onNavigate: (v: View) => void;
}

export default function Criacoes({ onNavigate }: Props) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="meell-card">
        <EmptyState
          icon={<ImagePlus className="w-12 h-12" strokeWidth={1.5} />}
          title="Suas criações aparecerão aqui 💗"
          description="Quando você gerar imagens com a Meell, elas serão salvas nesta galeria para você visualizar, baixar e reutilizar."
          action={
            <Button onClick={() => onNavigate('criar')}>
              Criar primeira imagem
            </Button>
          }
        />
      </div>
    </div>
  );
}
