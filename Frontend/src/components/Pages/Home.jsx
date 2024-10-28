import React from 'react'
import Card from './Card'
import Example from './Animate'
import { DragCards } from './AnimatedCards'
import Promo from './Promo'

function Home() {
    return (
        <>
            <Promo />
            <Example />
            <DragCards />
            <Card />
        </>
    )
}

export default Home