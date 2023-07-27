'use client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { Anchor, Breadcrumbs, Title } from "@mantine/core";
import { gql, useQuery } from "@apollo/client";
import { useParams, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { getRandomColorRGB } from "@/utils/getRandomColorRGB";
import Link from "next/link";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Charts() {
   const { id } = useParams();
   const { data: response, loading } = useQuery(gql`
      query GetCharts($where: WhereSurveyInput!) {
        charts: getCharts(where: $where) {
            title
            items {
               label
               count
            }
         }
         }
   `, { variables: { where: { id: parseInt(id) } } });
   const searchParams = useSearchParams();

   if (loading) {
      return <Loader />
   }

   const title = searchParams.get('name');

   const items = [
      { title: 'Encuestas', href: '/backoffice/surveys' },
      { title: `Estadísticas de ${title}`, href: `/backoffice/surveys/${id}/charts` },
   ].map((item, index) => (
      <Link href={item.href} key={index}>
         <Anchor>
            {item.title}
         </Anchor>
      </Link>
   ));

   if (!response.charts.length) {
      return <div className="h-full w-full flex justify-center items-center">
         <div>
            <Breadcrumbs>{items}</Breadcrumbs>
            <Title order={3}>No hay respuestas para esta encuenta</Title>
         </div>
      </div>
   }

   return (
      <div className="p-10">
         <Breadcrumbs>{items}</Breadcrumbs>
         <Title order={2} className='mt-10'>Estadísticas de {title}</Title>
         {response.charts.map((item: any, index: number) => {
            const data = {
               labels: item.items.map((item: any) => item.label),
               datasets: [{
                  label: item.title,
                  data: item.items.map((item: any) => item.count),
                  backgroundColor: item.items.map(() => getRandomColorRGB()),
               }]
            }
            return (
               <div key={index} className="flex items-center gap-5 border mt-10">
                  <div className="w-1/2">
                     <Title order={5} className='pt-5'>Gráfico de Barra</Title>
                     <Bar data={data} className='w-1/2' />
                  </div>
                  <div className="w-1/2">
                     <Title order={5} className='pt-5' >Gráfico Pastel</Title>
                     <Doughnut data={data} />
                  </div>
               </div>
            )
         })}
      </div>
   )
}