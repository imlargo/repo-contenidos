package core

import (
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
)

const (
	BaseUrl       = "https://siamed.unal.edu.co/academia/apoyo-administrativo/ConsultaContenidos.do?action=Info&idAsignatura="
	NO_ENCONTRADO = ""
)

func getUrl(codigo string) string {
	return BaseUrl + codigo
}

func getDocumentFromUrl(url string) *goquery.Document {
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}

	defer res.Body.Close()

	if res.StatusCode != 200 {
		log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
	}

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	return doc
}

func GetContenidoAsignatura(codigo string) *Asignatura {

	document := getDocumentFromUrl(getUrl(codigo))

	contendores := document.Find(".zona-dato-caja")
	contenedorMetadatos := contendores.Eq(1)
	contenedorPlanes := contendores.Eq(2)
	contenedorContenido := contendores.Eq(3)

	metadatos := getMetadatos(contenedorMetadatos)
	planes := getPlanes(contenedorPlanes)
	contenido := getContenido(contenedorContenido)

	return &Asignatura{
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
