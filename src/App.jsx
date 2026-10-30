import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { PageHero } from './components/PageHero'
import { Button } from './components/ui'
import Home from './pages/Home'
import About from './pages/About'
import Category from './pages/Category'
import Contact from './pages/Contact'
import { categories } from './content/categories'
import { hero } from './content/home'

function NotFound() {
  return (
    <PageHero eyebrow="404" title="Page not found">
      <div className="mt-8">
        <Button to="/#products">{hero.secondaryCta}</Button>
      </div>
    </PageHero>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          {categories.map((c) => (
            <Route key={c.slug} path={`products/${c.slug}`} element={<Category key={c.slug} slug={c.slug} />} />
          ))}
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
