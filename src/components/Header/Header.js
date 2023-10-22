import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

function Header() {
	const [userName, setUserName] = useState('')

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				setUserName(user.displayName)
			} else setUserName('')
		})
	}, [])

	const navigate = useNavigate()

	let setLogOut = () => {
		signOut(auth)
			.then(() => {
				navigate('/')
			})
			.catch(error => {
				console.log(error)
			})
	}

	return (
		<div style={{ marginBottom: '50px' }} className='container'>
			<AppBar
				position='static'
				color='default'
				elevation={0}
				sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
			>
				<Toolbar sx={{ flexWrap: 'wrap' }}>
					<Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
						<Link color='text.primary' href='/' sx={{ my: 1, mx: 1.5 }}>
							eTalon
						</Link>
					</Typography>
					<nav>
						<Link
							variant='button'
							color='text.primary'
							href='/'
							sx={{ my: 1, mx: 1.5 }}
						>
							{userName}
						</Link>
						<Link
							variant='button'
							color='text.primary'
							href='https://console.firebase.google.com/u/0/project/etalon-63854/authentication/users'
							sx={{ my: 1, mx: 1.5 }}
						>
							Админ панель
						</Link>
						{/* <Link
							variant='button'
							color='text.primary'
							href='#'
							sx={{ my: 1, mx: 1.5 }}
						>
							Чат
						</Link> */}
					</nav>
					<Button
						style={{
							display: userName ? 'none' : 'flex',
						}}
						href='login'
						variant='outlined'
						sx={{ my: 1, mx: 1.5 }}
					>
						Войти
					</Button>
					<Button
						variant='outlined'
						style={{
							display: userName ? 'block' : 'none',
						}}
						href='/'
						onClick={setLogOut}
					>
						Выйти
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Header
