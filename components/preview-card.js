import "./preview-card.scss";

const defaultImage = "/static/img/placeholder-ball.png";

export default function PreviewCard({ img, name }) {
  return (
    <div
      className={`preview-card mb-3 text-center ${(!img &&
        "preview-card-empty") ||
        null}`}>
      <img src={img || defaultImage} alt={name || "No Pokemon selected"} />
    </div>
  );
}
