import { useMemo, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

const products = [
  { id: 1, name: 'Everyday Runner', category: 'Shoes', price: 84, rating: '4.9', image: 'photo-1542291026-7eec264c27ff' },
  { id: 2, name: 'Studio Headphones', category: 'Tech', price: 129, rating: '4.8', image: 'photo-1505740420928-5e560c06d30e' },
  { id: 3, name: 'Classic Timepiece', category: 'Accessories', price: 96, rating: '4.7', image: 'photo-1523275335684-37898b6baf30' },
  { id: 4, name: 'Market Tote', category: 'Accessories', price: 38, rating: '4.9', image: 'photo-1590874103328-eac38a683ce7' },
  { id: 5, name: 'Daily Bottle', category: 'Home', price: 28, rating: '4.6', image: 'photo-1602143407151-7111542de6e8' },
  { id: 6, name: 'Soft Knit Throw', category: 'Home', price: 76, rating: '4.8', image: 'photo-1600210492486-724fe5c67fb0' },
  { id: 7, name: 'Weekend Camera', category: 'Tech', price: 189, rating: '4.9', image: 'photo-1516035069371-29a1b244cc32' },
  { id: 8, name: 'Leather Card Holder', category: 'Accessories', price: 42, rating: '4.7', image: 'photo-1627123424574-724758594e93' },
]

const imageUrl = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`
const money = (value) => `$${value.toFixed(2)}`

function Header({ count }) {
  return <><div className="announcement">A GOOD DAY TO FIND SOMETHING LOVELY <span>✳</span> FREE SHIPPING OVER $100</div><header className="header"><Link className="brand" to="/">goodthings<span>.</span></Link><nav><a href="/#shop">Shop</a><a href="/#about">Our story</a></nav><Link className="cart-link" to="/cart">Bag <span>{count}</span></Link></header></>
}

function Home({ add }) {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const categories = ['All', ...new Set(products.map((product) => product.category))]
  const shown = useMemo(() => products.filter((product) => (category === 'All' || product.category === category) && product.name.toLowerCase().includes(search.toLowerCase())), [category, search])
  return <>
    <main>
      <section className="hero"><div className="hero-copy"><span className="eyebrow">THE EVERYDAY EDIT · VOL. 04</span><h1>Good things.<br /><em>Better days.</em></h1><p>Thoughtful finds for wherever the day takes you. Meet the pieces you’ll reach for again and again.</p><a className="button dark" href="#shop">Shop the collection <span>↗</span></a><div className="hero-note">✳ &nbsp;Picked with care, made for real life</div></div><div className="hero-photo"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1500&q=90" alt="Sunlit independent shop" /><span>A LITTLE GOOD GOES A LONG WAY</span></div></section>
      <div className="perks"><span>✳ Thoughtfully picked</span><span>Free shipping over $100</span><span>Easy 30-day returns</span><span>✳ Here for the long run</span></div>
      <section className="shop" id="shop"><div className="section-heading"><div><span className="eyebrow">A FEW GOOD FINDS</span><h2>Things you’ll <em>love.</em></h2></div><p>Useful, lovely, and made to be part of your everyday.</p></div><div className="shop-tools"><div className="tabs">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><input className="search" aria-label="Search products" placeholder="Search the collection" value={search} onChange={(event) => setSearch(event.target.value)} /></div><div className="product-grid">{shown.map((product) => <article className="product-card" key={product.id}><div className="product-image"><img src={imageUrl(product.image)} alt={product.name} loading="lazy" /><span className="rating">★ {product.rating}</span><button aria-label={`Add ${product.name} to bag`} onClick={() => add(product)}>+</button></div><div className="product-info"><span>{product.category.toUpperCase()} · GOOD FIND</span><div><h3>{product.name}</h3><strong>{money(product.price)}</strong></div></div></article>)}</div>{!shown.length && <p className="empty-note">No items match that search. Try another name.</p>}</section>
      <section className="story" id="about"><div><span className="eyebrow">A SMALL SHOP WITH A BIG HEART</span><h2>Buy a little better.<br /><em>Feel a lot.</em></h2><p>The best things don’t need to be complicated. Just well made, useful, and the kind of thing that makes an ordinary Tuesday a little brighter.</p></div><img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1100&q=85" alt="A warm, carefully arranged shop" /></section>
    </main><Footer />
  </>
}

function Cart({ cart, change, remove }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 8
  return <main className="cart-page"><span className="eyebrow">GOOD THINGS, COMING YOUR WAY</span><h1>Your bag<span className="dot">.</span></h1>{cart.length === 0 ? <div className="empty-cart"><h2>Your bag is taking a little break.</h2><p>Let’s find it something lovely.</p><Link className="button dark" to="/#shop">Browse the collection ↗</Link></div> : <div className="cart-layout"><div>{cart.map((item) => <article className="cart-item" key={item.id}><img src={imageUrl(item.image)} alt={item.name} /><div className="cart-product"><span>{item.category}</span><h2>{item.name}</h2><strong>{money(item.price)}</strong><button className="remove" onClick={() => remove(item.id)}>Remove</button></div><div className="quantity"><button aria-label="Decrease quantity" onClick={() => change(item.id, -1)}>−</button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => change(item.id, 1)}>+</button></div><strong>{money(item.price * item.quantity)}</strong></article>)}</div><aside className="summary"><span className="eyebrow">THE NUMBERS</span><h2>Order summary</h2><p><span>Subtotal</span><span>{money(subtotal)}</span></p><p><span>Shipping</span><span>{shipping ? money(shipping) : 'On us'}</span></p><hr /><p className="total"><strong>Total</strong><strong>{money(subtotal + shipping)}</strong></p><Link className="button dark full" to="/checkout">Continue to checkout ↗</Link><small>Secure checkout · Easy 30-day returns</small></aside></div>}</main>
}

function Checkout({ cart, complete }) {
  const [done, setDone] = useState(false)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  if (done) return <main className="success"><span className="eyebrow">THAT’S A WRAP</span><h1>Good things are<br /><em>on their way.</em></h1><p>Thanks for shopping small. Your order is confirmed.</p><Link className="button dark" to="/">Back to the shop</Link></main>
  return <main className="checkout"><span className="eyebrow">JUST A FEW LITTLE DETAILS</span><h1>Let’s get it <em>to you.</em></h1>{cart.length === 0 ? <p>Your bag is empty. <Link to="/#shop">Browse the shop</Link></p> : <form onSubmit={(event) => { event.preventDefault(); complete(); setDone(true) }}><section className="checkout-fields"><h2>Shipping details</h2><label>Full name<input required autoComplete="name" placeholder="Jamie Taylor" /></label><label>Email address<input required type="email" autoComplete="email" placeholder="you@example.com" /></label><label>Street address<input required autoComplete="street-address" placeholder="123 Somewhere Lane" /></label><div className="field-row"><label>City<input required autoComplete="address-level2" /></label><label>Postal code<input required autoComplete="postal-code" /></label></div><h2>Payment</h2><label>Card number<input required inputMode="numeric" minLength="12" placeholder="1234 5678 9012 3456" /></label><p className="demo">Demo checkout — no payment will be taken.</p></section><aside className="summary"><h2>Your order</h2>{cart.map((item) => <p key={item.id}><span>{item.name} × {item.quantity}</span><span>{money(item.price * item.quantity)}</span></p>)}<hr /><p className="total"><strong>Total</strong><strong>{money(subtotal + (subtotal < 100 ? 8 : 0))}</strong></p><button className="button dark full">Place your order ↗</button></aside></form>}</main>
}

function Footer() { return <footer><Link className="brand" to="/">goodthings<span>.</span></Link><p>Little finds for the lovely in-between. Picked with care, sent with love.</p><small>© 2026 Goodthings. Made for the everyday.</small></footer> }

export default function App() {
  const [cart, setCart] = useState(() => { try { return JSON.parse(localStorage.getItem('goodthings-cart') || '[]') } catch { return [] } })
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  function update(next) { setCart(next); localStorage.setItem('goodthings-cart', JSON.stringify(next)) }
  function add(product) { const found = cart.find((item) => item.id === product.id); update(found ? cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...cart, { ...product, quantity: 1 }]) }
  function change(id, delta) { update(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0)) }
  return <><Header count={count} /><Routes><Route path="/" element={<Home add={add} />} /><Route path="/cart" element={<Cart cart={cart} change={change} remove={(id) => update(cart.filter((item) => item.id !== id))} />} /><Route path="/checkout" element={<Checkout cart={cart} complete={() => update([])} />} /><Route path="*" element={<main className="cart-page"><h1>Page not found.</h1><Link to="/">Back to the shop</Link></main>} /></Routes></>
}
