import PropTypes from "prop-types";

const ProductCard = ({ imageSrc, description }) => {
  return (
    <div className="rounded-lg overflow-hidden flex items-center justify-center flex-col p-5 min-w-30 min-h-30 shadow-lg group">
      <img
        className="w-30 h-28 object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
        src={imageSrc}
        alt="Card image"
      />
      <div className="px-6 py-4">
        <h1 className="text-xl font-bold group-hover:scale-110 transition-transform duration-300">
          {description}
        </h1>
      </div>
    </div>
  );
};

// Prop validation
ProductCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductCard;
