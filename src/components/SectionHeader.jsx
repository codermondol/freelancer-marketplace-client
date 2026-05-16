const SectionHeader = ({ eyebrow, title, subtitle, align = 'center' }) => {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <div className={`mx-auto flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="chip-fm">{eyebrow}</span>
      )}
      <h2 className="heading-fm text-3xl sm:text-4xl">{title}</h2>
      {subtitle && <p className="text-base leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
