import PropTypes from "prop-types";
const Developer = ({ developer }) => {
  return (
    <article
      className="relative py-10 border border-gray-500/20 rounded-lg overflow-hidden bg-white cursor-pointer hover:-translate-y-2 transition-all duration-300"
      key={developer.id}
    >
      <header className="h-52 w-52 relative rounded-full overflow-hidden mx-auto">
        <img
          src={developer.poster}
          alt=""
          className="absolute w-full h-full object-cover top-0 left-0 block hover:scale-110 transition-all duration-300"
        />
      </header>
      <h5 className="text-center text-lg text-wrap py-3 font-bold uppercase">
        {developer.name}
      </h5>
      <h3 className="mx-4 text-justify">{developer.rolDescription}</h3>
    </article>
  );
};

Developer.propTypes = {
  developer: PropTypes.any.isRequired,
};

export default Developer;
