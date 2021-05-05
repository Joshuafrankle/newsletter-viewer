import React from "react";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import Logo from "../assets/img/elevate_now.png";
import document from "../assets/pdfs/issue-02.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const canNavigate = (totalPages, currentPage) => {
  if (currentPage > totalPages || currentPage < 0) {
    return false;
  } else {
    return true;
  }
};

export default class Home extends React.Component {
  state = { numPages: null, pageNumber: 1 };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState((state) => ({
      pageNumber: canNavigate(state.numPages, state.pageNumber)
        ? state.pageNumber - 1
        : state.pageNumber,
    }));

  goToNextPage = () =>
    this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <section className="container mt-md-5 mt-0">
        <div className="bg-secondary">
          <div
            style={{ height: "10vh" }}
            className="d-flex inner-shadow justify-content-center bg-black"
          >
            <img src={Logo} alt="" className="img-fluid" />
          </div>
          <div className=" justify-content-center">
            <Document
              file={document}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 20 }}
                transition={{ duration: 2.5 }}
                className="container d-md-none d-flex justify-content-center"
              >
                <Page
                  pageNumber={pageNumber}
                  className="dark-shadow "
                  width={300}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 20 }}
                transition={{ duration: 2.5 }}
                className="container d-md-flex d-none  justify-content-center"
              >
                <Page
                  pageNumber={pageNumber}
                  className="dark-shadow "
                  width={500}
                />
              </motion.div>
            </Document>
          </div>
          <nav className="d-flex mt-5 py-3 bg-black align-items-center justify-content-center ">
            <button
              className="btn btn-sm btn-primary px-2"
              onClick={this.goToPrevPage}
            >
              &#60;
            </button>

            <div className=" d-flex text-white px-5 align-items-center">
              Page {pageNumber} of {numPages}
            </div>

            <button
              className="btn btn-sm btn-primary px-2"
              onClick={this.goToNextPage}
            >
              &#62;
            </button>
          </nav>
        </div>
      </section>
    );
  }
}
