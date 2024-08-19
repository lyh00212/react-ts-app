import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import '@testing-library/jest-dom'

import Component from './Component'

describe('questionTitle', () => {
    it('默认属性', () => {
        render(<Component />)
        const h = screen.getByText('一行标题')
        expect(h).toBeInTheDocument()
    })
    it('传入属性', () => {
        render(<Component text="hello" level={2} isCenter={true} />)
        const h = screen.getByText('hello')
        expect(h).toBeInTheDocument()
        // toBeTruthy: 判断布尔值是否为true；toBeFalsy：判断布尔值是否为false
        expect(h.matches('h2')).toBeTruthy()
        // expect(h.matches('h2')).toBeFalsy()
        const style = h.style
        expect(style.textAlign).toBe('center')
    })
})
