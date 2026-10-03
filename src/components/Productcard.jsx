import { Link } from "react-router-dom"

function ProductCard({ id, name, price, oldPrice, image, onAddToCart, rating, reviews, badge, color, index }) {
  return <article className="product-card" style={{ "--card-delay": `${index * 55}ms` }}><Link className="product-image-wrap" to={`/product/${id}`} style={{ backgroundColor: color }}><img src={image} alt={name} loading="lazy" />{badge && <span className="product-badge">{badge}</span>}<span className="quick-view">Take a closer look <span>↗</span></span></Link><div className="product-meta"><span>{rating} ★ <span className="review-count">({reviews})</span></span><span>✳ {name.length > 15 ? "PICKED WITH CARE" : "GOOD FIND"}</span></div><div className="product-info"><div><Link to={`/product/${id}`}><h3>{name}</h3></Link><p>{oldPrice && <del>${oldPrice.toFixed(2)}</del>} ${price.toFixed(2)}</p></div><button className="add-button" aria-label={`Add ${name} to bag`} onClick={onAddToCart}>+</button></div></article>
}

export default ProductCard
