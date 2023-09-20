package br.com.arcelino.uploadfileapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.arcelino.uploadfileapi.entity.ArquivoAnexo;

public interface ArquivoAnexoRepository extends JpaRepository<ArquivoAnexo, Integer> {

}
