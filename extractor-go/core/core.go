package core

import (
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
)

type Metadatos struct {
	Codigo              string
	Nombre              string
	Uab                 string
	Vigente             bool
	HorasPresenciales   int
	HorasNoPresenciales int
	Creditos            int
	Validable           bool
	Electiva            bool
	Descripcion         string
}

type Asignatura struct {
	Codigo              string   `json:"codigo"`
	Nombre              string   `json:"nombre"`
	Uab                 string   `json:"uab"`
	Vigente             bool     `json:"vigente"`
	HorasPresenciales   int      `json:"horasPresenciales"`
	HorasNoPresenciales int      `json:"horasNoPresenciales"`
	Creditos            int      `json:"creditos"`
	Validable           bool     `json:"validable"`
	Electiva            bool     `json:"electiva"`
	Descripcion         string   `json:"descripcion"`
	Contenido           string   `json:"contenido"`
	PlanesRelacionados  []string `json:"planes_relacionados"`
}

const (
	BaseUrl       = "https://siamed.unal.edu.co/academia/apoyo-administrativo/ConsultaContenidos.do?action=Info&idAsignatura="
	NO_ENCONTRADO = ""
)

func getUrl(codigo string) string {
	return BaseUrl + codigo
}

func getDocument(url string) *goquery.Document {
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}

	defer res.Body.Close()

	if res.StatusCode != 200 {
		log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
	}

	// Load the HTML document
	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	// Imprimir raw res body

	return doc
}

func GetContenidoAsignatura(codigo string) Asignatura {

	document := getDocument(getUrl(codigo))

	contendores := document.Find(".zona-dato-caja")
	contenedorMetadatos := contendores.Eq(1)
	contenedorPlanes := contendores.Eq(2)
	contenedorContenido := contendores.Eq(3)

	metadatos := getMetadatos(contenedorMetadatos)
	planes := getPlanes(contenedorPlanes)
	contenido := getContenido(contenedorContenido)

	return Asignatura{
		Codigo:              codigo,
		Nombre:              metadatos.Nombre,
		Uab:                 metadatos.Uab,
		Vigente:             metadatos.Vigente,
		HorasPresenciales:   metadatos.HorasPresenciales,
		HorasNoPresenciales: metadatos.HorasNoPresenciales,
		Creditos:            metadatos.Creditos,
		Validable:           metadatos.Validable,
		Electiva:            metadatos.Electiva,
		Descripcion:         metadatos.Descripcion,
		Contenido:           contenido,
		PlanesRelacionados:  planes,
	}

}
