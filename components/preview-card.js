import "./preview-card.scss";

const defaultImage = "/img/placeholder-ball.png";

export default function PreviewCard({ image, name }) {
  return (
    <div
      className={`cell small-2 large-12 preview-card mb-3 text-center ${(!image &&
        "preview-card-empty") ||
        ""}`}>
      {(image && (
        <picture>
          <source srcSet={`${image}.webp`} type="image/webp" />
          <img src={`${image}.png`} alt={name} width="150" height="150" />
        </picture>
      )) || (
        <img
          src={defaultImage}
          alt="No Pokemon Selected"
          width="150"
          height="150"
        />
      )}
    </div>
  );
}
