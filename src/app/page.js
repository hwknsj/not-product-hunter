'use client'
import { useState } from 'react'
import { data } from './data'

const ProductItem = ({
  title,
  icon,
  description,
  tags,
  votes,
  handleUpvote
}) => {
  return (
    <article className='flex product-section'>
      {icon && <img src={icon} alt='icon' className='inline-flex' />}
      <h2 className='inline-flex text-xl'>{title}</h2>
      <p className='inline-flex text-base'>{description}</p>
      <VoteButton handleUpvote={handleUpvote} title={title} votes={votes} />
      <ul className='flex space-x-0.5 justify-start mt-4'>
        {tags.map((tag, i) => (
          <li className='inline-flex text-sm rounded-sm tag' key={i}>
            {tag}
          </li>
        ))}
      </ul>
    </article>
  )
}

const VoteButton = ({ handleUpvote, title, votes }) => {
  return (
    <button
      className='inline-flex justify-end text-2xl rounded-full justify-items-center upvote'
      aria-label={`Vote for ${title}`}
      onClick={() => handleUpvote(title, votes)}>
      {votes > 0 ? `(${votes})` : ''}
    </button>
  )
}

const sortVotes = (a, b) => b.votes - a.votes

const ProductList = ({ products }) => {
  let sortedProducts = products.toSorted(sortVotes)
  const [productList, setProductList] = useState(sortedProducts)

  const handleUpvote = (title, votes) => {
    const index = productList.findIndex(product => product.title === title)
    const currentProduct = productList[index]
    const newProduct = { ...currentProduct, votes: votes + 1 }

    const newList = [
      ...productList.slice(0, index),
      newProduct,
      ...productList.slice(index + 1)
    ]
    setProductList(newList.toSorted(sortVotes))
  }

  return (
    <ul>
      {productList.map(({ title, icon, description, tags, votes }, i) => (
        <ProductItem
          key={title}
          title={title}
          icon={icon}
          description={description}
          tags={tags}
          votes={votes}
          handleUpvote={handleUpvote}
        />
      ))}
    </ul>
  )
}
const { products } = data

const Home = () => {
  let productList = [...products]
  return (
    <div className='container w-full'>
      <nav className='justify-start w-full ml-8 mr-8 h-11'>
        <h1 className='inline-flex text-xl mr-11'>Not Product Hunter</h1>
        <ul className='inline-flex space-x-5 list-none'>
          <li>Home</li>
          <li>Products</li>
          <li>News</li>
        </ul>
      </nav>
      <main className='container flex justify-center'>
        <ProductList products={productList} />
      </main>
    </div>
  )
}

export default Home
