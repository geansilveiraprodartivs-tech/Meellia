import mascoteOficial from './MascotePlaceholder/c2a39992-faa7-4e28-b622-74498a6c4d80.png';

interface Props {
  size: 'header' | 'message';
  className?: string;
}

const dims = {
  header: 'h-20 sm:h-24 w-auto',
  message: 'h-16 sm:h-20 w-auto',
};

// Avatar oficial da Meell — reutilizável em todas as mensagens da Meell.
export default function MeellAvatar({ size, className = '' }: Props) {
  return (
    <img
      src={mascoteOficial}
      alt="Mascote oficial da Meell"
      className={`object-contain shrink-0 ${dims[size]} ${className}`}
      draggable={false}
    />
  );
}
