import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein }
}

export default function BasicTable(props) {
	let data = props.data
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Имя</TableCell>
						<TableCell align='right'>Выйдет в</TableCell>
						<TableCell align='right'>Статус</TableCell>
						{/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map(row => (
						<TableRow
							key={row.name}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component='th' scope='row'>
								{row.name}
							</TableCell>
							<TableCell align='right'>{row.nextTime}</TableCell>
							<TableCell
								style={{
									border: row.status === 'Вышел' ? '2px solid red' : '',
								}}
								align='right'
							>
								{row.status}
							</TableCell>
							{/* <TableCell align='right'>{row.carbs}</TableCell>
							<TableCell align='right'>{row.protein}</TableCell> */}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
