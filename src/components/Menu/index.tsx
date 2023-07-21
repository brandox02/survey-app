'use client';
import MenuItem from './MenuItem';
import { menuItems } from '@/config/menuItemsConf';
import { FiLogOut } from 'react-icons/fi';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader, Tooltip } from '@mantine/core';

export default function Menu() {
   const router = useRouter();
   const [loadingLogout, setLoadingLogout] = useState(false);

   function onLogout() {
      setLoadingLogout(true);
      Cookie.remove('auth');
      router.replace('/login');
   }

   return <div
      className='text-white font-medium flex flex-col items-center h-full bg-emerald-600 p-5 shadow'
   >
      {/* <Image src={YoCreoEnTi} alt={'Yo creo en ti'} className={'my-5'} width={180} />
      <Image src={MenuGirl} alt={'Menu Girl'} className={''} /> */}
      <span className='mt-5 text-2xl font-bold text-gray-100'>Encuesta App</span>
      {loadingLogout ? <Loader /> : (
         <Tooltip label='Cerrar Sesión'>
            <FiLogOut className='mt-3 cursor-pointer' size={25} onClick={onLogout} />
         </Tooltip>
      )}

      <div className=' mt-10'>
         {menuItems.map(({ icon, label, to }, index) => (
            <MenuItem key={index} label={label} icon={icon} to={to} />
         ))}
      </div>
      <div className='absolute bottom-10 flex flex-col items-center'>
         {/* <Image
            width={70}
            className=''
            src={PRMIcon}
            alt='prm icon'
         /> */}
         <div className='flex flex-col mt-3 items-center'>
            <span className='text-sm'>© 2023 Encuesta App</span>
            <span className='text-xs'>Todos los derechos reservados</span>
         </div>
      </div>
   </div>
}