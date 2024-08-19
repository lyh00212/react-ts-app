import React from 'react'
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import Component from './Component'

describe('questionInput', () => {
    it('默认属性', () => {
        render(<Component />)
        const p = screen.getByText('输入框标题')
        expect(p).toBeInTheDocument()
        const input = screen.getByPlaceholderText('请输入...')
        expect(input).toBeInTheDocument()
    })
    it('传入属性', () => {
        render(<Component title="hello" placeholder="world" />)
        const p = screen.getByText('hello')
        expect(p).toBeInTheDocument()
        const input = screen.getByPlaceholderText('world')
        expect(input).toBeInTheDocument()
    })
})