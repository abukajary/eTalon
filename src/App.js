import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import CssBaseline from '@mui/material/CssBaseline'

import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Admin from './components/Admin/Admin'

// import { auth } from './firebase'

import './App.css'
import Header from './components/Header/Header'

const ColorModeContext = React.createContext({
	toggleColorMode: () => {},
})

function App() {
	const [mode, setMode] = React.useState('light')
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light')
				setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
			},
		}),
		[]
	)

	useEffect(() => {
		if (localStorage.getItem('mode')) {
			setMode(localStorage.getItem('mode'))
		}
	}, [])

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	)

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className='App'>
					<Box
						sx={{
							display: 'flex',
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center',
							bgcolor: 'background.default',
							color: 'text.primary',
							borderRadius: 0,
							p: 0,
						}}
					>
						{theme.palette.mode} mode
						<IconButton
							sx={{ ml: 1 }}
							onClick={colorMode.toggleColorMode}
							color='inherit'
						>
							{theme.palette.mode === 'dark' ? (
								<Brightness7Icon />
							) : (
								<Brightness4Icon />
							)}
						</IconButton>
					</Box>
					<Router>
						<Header />
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route path='/signup' element={<Signup />} />
							<Route path='/admin' element={<Admin />} />
							<Route path='/' element={<Home />} />
						</Routes>
					</Router>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}

export default App
