import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Component from './Component'

expect.extend({
    toBeInTheDocument: received => {
        return received && document.body.contains(received)
    },
})

describe('QuestionInfo', () => {
    it('默认属性', () => {
        render(<Component />) // 渲染组件
        const h = screen.getByText('问卷标题')
        expect(h).toBeDefined()
        expect(document.body.contains(h)).toBe(true)
    })
    it('传入属性', () => {
        render(<Component title="hello" desc="world" />)
        const h = screen.getByText('hello')
        expect(h).toBeDefined()
        expect(document.body.contains(h)).toBe(true)
        const p = screen.getByText('world')
        expect(document.body.contains(p)).toBe(true)
    })
    it('多行文字', () => {
        render(<Component desc={'a\nb\nc'} />)
        const span = screen.getByText('a')
        expect(document.body.contains(span)).toBe(true)
        // expect(span).toBeInTheDocument()
        expect(span).toHaveTextContent('a')
        expect(span).not.toHaveTextContent('ab') // a和b之间有换行，所以不存在'ab'
    })
})
