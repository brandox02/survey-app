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

   const customTooltip = (tooltipModel: any) => {
      const imageUrls = response.charts.map((item: any) => 'https://s3.amazonaws.com/assets.fullstack.io/n/20200309095518221_react-chartjs.png');
      let tooltipEl = document.getElementById("custom-tooltip");

      if (!tooltipEl) {
         tooltipEl = document.createElement("div");
         tooltipEl.id = "custom-tooltip";
         tooltipEl.classList.add("custom-tooltip");
         document.body.appendChild(tooltipEl);
      }

      // Hide if no tooltip
      if (tooltipModel.opacity === 0) {
         tooltipEl.style.opacity = '0';
         return;
      }

      // Set the position of the tooltip
      tooltipEl.style.position = "absolute";
      tooltipEl.style.left = `${tooltipModel.caretX}px`;
      tooltipEl.style.top = `${tooltipModel.caretY}px`;
      tooltipEl.style.pointerEvents = "none";

      // Set the content of the tooltip (you can customize this part as needed)
      if (tooltipModel.body) {
         const dataPointIndex = tooltipModel.dataPoints[0].index;
         const imageUrl = imageUrls[dataPointIndex];
         const tooltipContent = `<img src="${imageUrl}" alt="Image" />`;
         tooltipEl.innerHTML = tooltipContent;
      }

      // Show the tooltip
      tooltipEl.style.opacity = '1';
   };

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
               <div key={index} className='my-10'>
                  <Title order={4}>{item.title}</Title>
                  <div className="flex items-center justify-around">
                     <div className="w-1/2">
                        <Title order={5} className='pt-5'>Gráfico de Barra</Title>
                        <Bar
                           data={data}
                           className='w-2/8'
                        // options={{
                        //    tooltips: {
                        //       enabled: false,
                        //       custom: customTooltip,
                        //    },
                        //    plugins: {
                        //       datalabels: {
                        //          display: false, // You can customize data labels if you use them
                        //       }
                        //    }
                        // }}
                        />
                     </div>
                     <div className="w-2/8">
                        <Title order={5} className='pt-5' >Gráfico Pastel</Title>
                        <Doughnut data={data} />
                     </div>
                  </div>
               </div>
            )
         })}
      </div>
   )
}