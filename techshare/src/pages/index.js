import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'


export default function Home() {
	const router = useRouter()

	function handleClick () {
		router.push({
			pathname: "/dragdrop",
			query: {
				imgs: ["https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4383351.png&w=350&h=254", "https://static.www.nfl.com/image/private/t_headshot_desktop/league/h9ndf9ralxifgjvot2q4", "https://b.fssta.com/uploads/application/nfl/headshots/13985.png",
				"https://static.www.nfl.com/image/private/t_headshot_desktop/league/vs40h82nvqaqvyephwwu", "https://static.www.nfl.com/image/private/t_headshot_desktop/league/hdwbdlyiose4znenx5ed" ],
				num: 3
			}
		})
	}

  return (<>
	<div className="title">
        <h1>Move the Images</h1>
	</div>
	<div className='UploadImg'>
		<button type='button' onClick={handleClick} text>Create Tiered Page!</button>
	</div>

  </>)
}
