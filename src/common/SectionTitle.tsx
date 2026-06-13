interface ISectionTitleProp {
  title: string;
  description: string;
}

export default function SectionTitle({
  title,
  description,
}: ISectionTitleProp) {
  return (
    <div className="text-start">
      <h2 className="text-3xl font-medium mb-8 text-[#373A41]">{title}</h2>
      <p className="text-lg text-[#85888E]">{description}</p>
    </div>
  );
}
