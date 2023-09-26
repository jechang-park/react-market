import Image from 'next/image';


const Header = () => {
    return (
        <div>
            <div className="header">
                <div className="header_sec01">
                    <ul className='cate'>
                        <li>BEST</li>
                        <li>NEW</li>
                        <li><Image src="/images/top_cart.png" alt="Cart Icon" width={50} height={50} />
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default Header;