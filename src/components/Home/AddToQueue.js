import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function AddToQueue() {
	const [status, setStatus] = React.useState('')

	const handleChange = event => {
		setStatus(event.target.value)
	}

	return (
		<div>
			<FormControl sx={{ mb: 1, minWidth: 100 }}>
				<InputLabel id='demo-simple-select-autowidth-label'>Статус</InputLabel>
				<Select
					labelId='demo-simple-select-autowidth-label'
					id='demo-simple-select-autowidth'
					value={status}
					onChange={handleChange}
					autoWidth
					label='Status'
				>
					<MenuItem value={1}>Вышел</MenuItem>
					<MenuItem value={2}>Не вышел</MenuItem>
					<MenuItem value={3}>Пришел</MenuItem>
					<MenuItem value={4}>Туалет</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
}
