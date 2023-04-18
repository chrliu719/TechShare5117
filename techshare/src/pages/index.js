import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'


export default function Home() {
	const router = useRouter()
	// ["https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4383351.png&w=350&h=254", "https://static.www.nfl.com/image/private/t_headshot_desktop/league/h9ndf9ralxifgjvot2q4", "https://b.fssta.com/uploads/application/nfl/headshots/13985.png",
	// 			"https://static.www.nfl.com/image/private/t_headshot_desktop/league/vs40h82nvqaqvyephwwu", "https://static.www.nfl.com/image/private/t_headshot_desktop/league/hdwbdlyiose4znenx5ed" ]
	function handleClick () {
		var imgs = []
		var num = parseInt(document.getElementById('numCol').value)
		const files = document.getElementById('images').files
		for (var i = 0; i < files.length; i++){
			imgs.push(URL.createObjectURL(files[i]))
		}
		router.push({
			pathname: "/dragdrop",
			query: {
				imgs: imgs,
				num: num
			}
		})
	}

  return (<>
	<div className="title">
        <h1>Move the Images</h1>
	</div>
	<div className='UploadImg'>
		<input className='formItem' type="file" id="images" name="images" accept='image/*' multiple/>
		<div className='formItem'>
			<label for="numCol">Number of columns: </label>
			<input  type="text" id="numCol" name="numCol" defaultValue={0}/>
		</div>
		<button className='formItem' type='button' onClick={handleClick} text>Create Tiered Page!</button>
	</div>

  </>)
}
