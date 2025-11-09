import headerImage from "@assets/018_1762692764924.png";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative h-64 md:h-80 w-full overflow-hidden" data-testid="page-header-container">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${headerImage})` }}
        data-testid="page-header-background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2"
          style={{ fontFamily: 'Outfit, sans-serif' }}
          data-testid="page-header-title"
        >
          {title}
        </h1>
        {subtitle && (
          <p 
            className="text-lg md:text-xl text-white/90 max-w-2xl"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="page-header-subtitle"
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
