import { useRouter } from 'next/router'


export default function Home() {
	const router = useRouter()
	const query = router.query
	console.log(query)
	return(
		<>
		<div className="title">
        <h1>Images Moved!</h1>
        </div>
		{query['colNames'].map((colName) => {
			if (typeof(query[colName]) === 'string'){
				console.log("HERE!!")
				return (<>
					<div className='saveDiv'>
						<div>
							{colName}
						</div>
						<div >
							<img className='saveImg' src={query[colName]}/>
						</div>
					</div>
				</>	
				)
			}
			else if (typeof(query[colName])  === 'object'){
				console.log("Not HERE!!")
				return (<>
				<div className='saveDiv'>
					<div>
						{colName}
					</div>
					{query[colName].map((img) => {
						console.log("mapped Image", img)
						return(
							<div>
								<img className='saveImg' src={img}/>
							</div>
						)
					})}
				</div>
				</>	
				)
			}
			else{
				return (<>
				<div className='saveDiv'>
					<div>
						Nothing in {colName}
					</div>
				</div>
	
				</>	
				)
			}			
		})}
		</>
	)
}
