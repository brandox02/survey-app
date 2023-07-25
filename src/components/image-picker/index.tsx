'use client ';
import { Group, Modal, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { GiCancel } from 'react-icons/gi'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdInsertPhoto } from 'react-icons/md'
import Image from 'next/image';
import imageNonFound from '@/images/non-image.png';
import toast from 'react-hot-toast';
import { getBase64 } from '@/utils/fileToBase64';


type ImagePicker = {
   onLoad: Function, image: any, setImage: (image: any) => void
}

export const ImagePicker = ({ onLoad, image, setImage }: ImagePicker) => {

   return <div className='flex flex-col items-center'>
      <Dropzone
         onDrop={async ([file]) => {
            const base64Image = await getBase64(file);
            onLoad && onLoad(base64Image);
            setImage(base64Image);
            toast.success('Imagen cargada correctamente');
         }}
         multiple={false}
         onReject={(files) => console.log('rejected files', files)}
         maxSize={5242880}
         accept={IMAGE_MIME_TYPE}
      >
         <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 220, pointerEvents: 'none' }}
            className='flex flex-col'
         >
            <Dropzone.Accept>
               <AiOutlineCloudUpload
                  size={50}
                  stroke={'1.5'}
                  color={'dark'}
               />
            </Dropzone.Accept>
            <Dropzone.Reject>
               <GiCancel
                  size={50}
                  // stroke={1.5}
                  color={'red'}
               />
            </Dropzone.Reject>
            <Dropzone.Idle>
               <MdInsertPhoto size={50} stroke={'1.5'} />
            </Dropzone.Idle>

            <div>
               <Text size="xl" inline>
                  Arrastra tu imagen acá o haz click aquí para cargarla
               </Text>
               <Text size="sm" color="dimmed" inline mt={7}>
                  Las imagenes no pueden exceder de los 5mb
               </Text>

            </div>
         </Group>
      </Dropzone>
      <Image width={250} height={0} src={image || imageNonFound} alt={'load-image'} />
   </div>
}