import { CaptureData } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FC, useRef } from "react";
import { FaCopy, FaPaw } from "react-icons/fa";
import { useQuery } from "react-query";
import { PropagateLoader } from "react-spinners";

type PageProps = { host: string | null };

const Home: NextPage<PageProps> = ({ host }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["captures"],
    queryFn: () => axios.get("/api"),
  });

  return (
    <main className="bg-base-100">
      <div className="felx flex-1 items-center p-10 bg-base-100">
        <div className="relative max-w-min">
          <h1 className="text-6xl font-bold text-neutral max-w-min">Pet Detection</h1>
          <FaPaw className="mx-4 absolute left-[35%] top-0 text-6xl text-neutral" />
        </div>
      </div>
      {!isLoading && data ? <DataList data={data.data} /> : <Loader />}
    </main>
  );
};

export default Home;

type CaptureDataResponse = CaptureData & { detectedAt: string | Date };

type DataListProps = {
  data: CaptureDataResponse[];
};

const DataList: FC<DataListProps> = ({ data }) => {
  return (
    <div className="bg-secondary p-5 mx-10 rounded-lg flex flex-wrap">
      {data.map((item) => (
        <ListCard item={item} key={item.id} />
      ))}
    </div>
  );
};

type ListCardProps = {
  item: CaptureDataResponse;
};

const ListCard: FC<ListCardProps> = ({ item }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img src={item.image} alt={item.detectedPet} />
        </figure>
        <div className="card-body">
          <div className="flex flex-1 justify-center">
            <h2 className="card-title text-neutral text-3xl text-center max-w-min">
              {item.detectedPet}
            </h2>
          </div>
          <p className="text-neutral text-lg">
            Detected at: {new Date(item.detectedAt).toISOString()}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => modalRef && modalRef.current?.showModal()}
          >
            View More
          </button>
          <dialog id="my_modal_2" className="modal" ref={modalRef}>
            <form method="dialog" className="modal-box max-w-none w-1/2 bg-transparent">
              <div className="card lg:card-side bg-base-100 shadow-xl">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <figure>
                  <img src={item.image} alt={item.detectedPet} />
                </figure>
                <div className="card-body flex flex-col justify-between">
                  <div>
                    <h2 className="card-title mt-4 text-3xl">It's a {item.detectedPet}</h2>
                    <ul className="list-disc ml-2 mt-4">
                      <li className="text-neutral text-lg">ID: {item.id}</li>
                      <li className="text-neutral text-lg">
                        Detected at: {new Date(item.detectedAt).toISOString()}
                      </li>
                      <li className="text-neutral text-lg">Confidence: {item.confidence}%</li>
                    </ul>
                  </div>
                  <div className="card-actions flex justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(`/api/${item.id}`);
                      }}
                    >
                      <FaCopy /> API URI
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(item.image);
                      }}
                    >
                      <FaCopy /> Image Source
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

const Loader = () => (
  <div className="w-full flex flex-1 justify-center items-center">
    <PropagateLoader color="#2E282A" />
  </div>
);

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => ({
  props: { host: context.req.headers.host || null },
});
