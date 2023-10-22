import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

function createData(name, nextTime, status, nextCount, avgNextTime) {
	return {
		name,
		nextTime,
		status,
		history: [
			{
				nextCount: nextCount,
				avgNextTime: avgNextTime,
			},
		],
	}
}

function Row(propws) {
	const { row } = propws
	const [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<TableRow
				style={{
					border: row.fat === 'Вышел' ? '2px solid red' : '',
				}}
				sx={{ '& > *': { borderBottom: 'unset' } }}
			>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component='th' scope='row'>
					{row.name}
				</TableCell>
				<TableCell align='right'>{row.calories}</TableCell>
				<TableCell align='right'>{row.fat}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant='h6' gutterBottom component='div'>
								Статистика
							</Typography>
							<Table size='small' aria-label='purchases'>
								<TableHead>
									<TableRow>
										<TableCell>Количество выходов</TableCell>
										<TableCell>Среднее время в перерыве</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.history.map(historyRow => (
										<TableRow key={historyRow.date}>
											<TableCell component='th' scope='row'>
												{historyRow.date}
											</TableCell>
											<TableCell>{historyRow.customerId}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}

Row.propTypes = {
	row: PropTypes.shape({
		nextTime: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		history: PropTypes.arrayOf(
			PropTypes.shape({
				nextCount: PropTypes.string.isRequired,
				avgNextTime: PropTypes.string.isRequired,
			})
		).isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
}

const rows = [
	createData('Абу', 'в 10:00', 'Не вышел', '0/2', '0 мин. / 15'),
	createData('Темир', 'в 17:31', 'Вышел', '3/2', '11 мин. / 15'),
	createData('Абу2', 'в 10:00', 'Не вышел', '0/2', '0 мин. / 15'),
	createData('Темир2', 'в 17:31', 'Не вышел', '3/2', '11 мин. / 15'),
]

export default function QueueTableOld(props) {
	let qData = props.data
	return (
		<TableContainer component={Paper}>
			<Table aria-label='collapsible table'>
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>Имя</TableCell>
						<TableCell align='right'>Выйдет</TableCell>
						<TableCell align='right'>Статус</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => (
						<Row key={row.key} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
