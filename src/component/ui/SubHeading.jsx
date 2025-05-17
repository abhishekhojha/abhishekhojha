export default function SubHeading({ heading, subtext }) {
  return (
    <div className="subHeading pt-6 pt-2 text-justify">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
        {heading}
      </h3>
      <p className="text-sm md:text-base text-gray-800 mt-2">
        {subtext}
      </p>
    </div>
  );
}
