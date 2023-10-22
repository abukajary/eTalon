import React from 'react'
import { db } from '../../firebase'
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore'
import QueueTable from './QueueTable'
import QueueTableOld from './QueueTable_old'

import { useState, useEffect } from 'react'

function Queue(props) {
	let tday = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`

	const [queue, setQueue] = useState([])
	const getQueue = async () => {
		const querySnapshot = await getDocs(collection(db, 'queue'))
		const queue = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}))
		setQueue(queue)
	}

	useEffect(() => {
		getQueue()
	}, [])

	return (
		<>
			<div>
				<h3>Очередь за {tday}</h3>
				<QueueTable data={queue}/>
				
				
				{/* {queue.map(item => (
					<div key={item.id}>{item.name}</div>
				))} */}

				
			</div>
		</>
	)
}

export default Queue
