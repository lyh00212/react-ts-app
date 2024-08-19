import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import '@testing-library/jest-dom'

import Component from './Component'

describe('questionParagraph', () => {
    it('默认属性', () => {
        render(<Component />)
        const span = screen.getByText('一行段落')
        expect(span).toBeInTheDocument()
    })
    it('传入属性', () => {
        render(<Component text="hello" isCenter={true} />)
        const span = screen.getByText('hello')
        expect(span).toBeInTheDocument()
        const p = span.parentElement
        expect(p).not.toBeNull()
        const style = p!.style || {}
        expect(style.textAlign).toBe('center')
    })
    it('多行文字', () => {
        render(<Component text={'a\nb\nc'} />)
        const span = screen.getByText('a')
        expect(span).toBeInTheDocument()
        expect(span).toHaveTextContent('a')
        // expect(span).toHaveTextContent('ab')
    })
})
