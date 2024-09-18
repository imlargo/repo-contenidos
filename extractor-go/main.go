package main

import (
	"encoding/json"
	"extractor-contenido/core"
	"os"
)

func main() {
	codigos := []string{"1000005-M", "3007847", "3011019"}
	asignaturas := make([]core.Asignatura, 3)

	for i, codigo := range codigos {
		asignaturas[i] = core.GetContenidoAsignatura(codigo)
	}

	// Marshall json
	json, _ := json.Marshal(asignaturas)
	os.WriteFile("data.json", json, 0644)

}
