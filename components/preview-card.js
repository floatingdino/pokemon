import "./preview-card.scss";

const defaultImage = "/img/placeholder-ball.png";

export default function PreviewCard({ image, name }) {
  return (
    <div
      className={`preview-card mb-3 text-center ${(!image &&
        "preview-card-empty") ||
        null}`}>
      <img
        src={image || defaultImage}
        alt={name || "No Pokemon selected"}
        width="150"
        height="150"
      />
    </div>
  );
}
