import "./styles.css"

export function ItemList({title, description, url}) {
  return (
    <div className="Item-List">
      <strong>
        <a href={url}>
          {title}
        </a>
      </strong>
      <p>{description}</p>
      <hr />
    </div>
  )
}
