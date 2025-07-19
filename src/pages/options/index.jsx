import React from 'react'
import { createRoot } from 'react-dom/client'
import OptionsApp from '@components/options/OptionsApp'
import '@/styles/global.css'
import './options.css'

const container = document.getElementById('options-root')
const root = createRoot(container)
root.render(<OptionsApp />)