import React, { useEffect, useState } from 'react'

import { auth } from '../../firebase'

import Header from '../Header/Header'
import Queue from './Queue'
import Alert from '@mui/material/Alert'

import { Container } from '@mui/material'
import AddToQueue from './AddToQueue'

function Home() {
	const [userName, setUserName] = useState('')

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				setUserName(user.displayName)
			} else setUserName('')
		})
	}, [])
	return (
		<>
			{/* <Header user={props} /> */}
			<Container>
				{!userName && (
					<Alert severity='error'>
						Войдите чтобы взаймодействовать с очередью!
					</Alert>
				)}
				{userName && <AddToQueue />}
				<Queue user={userName} />
			</Container>
		</>
	)
}

export default Home
