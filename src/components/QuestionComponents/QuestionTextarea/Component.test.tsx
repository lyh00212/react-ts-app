import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Component from './Component'

describe('questionTextarea', () => {
    it('默认属性', () => {
        render(<Component />)
        const p = screen.getByText('输入框标题')
        expect(p).toBeInTheDocument()
        const textarea = screen.getByPlaceholderText('请输入...')
        expect(textarea).toBeInTheDocument()
    })
    it('传入属性', () => {
        render(<Component title="hello" placeholder="world" />)
        const p = screen.getByText('hello')
        expect(p).toBeInTheDocument()
        const textarea = screen.getByPlaceholderText('world')
        expect(textarea).toBeInTheDocument()
    })
})
