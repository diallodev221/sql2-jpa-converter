package com.diallodev.sql2jpa.service;

import lombok.extern.slf4j.Slf4j;
import net.sf.jsqlparser.parser.CCJSqlParserUtil;
import net.sf.jsqlparser.statement.Statement;
import net.sf.jsqlparser.statement.create.table.CreateTable;
import net.sf.jsqlparser.statement.create.table.ColumnDefinition;
import net.sf.jsqlparser.statement.create.table.Index;
import com.diallodev.sql2jpa.model.ColumnInfo;
import com.diallodev.sql2jpa.model.TableInfo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class SqlParserService {

    public List<TableInfo> parseSQL(String sqlSchema) {
        log.info("Parsing SQL schema: {}", sqlSchema);
        List<TableInfo> tables = new ArrayList<>();

        try {
            List<Statement> statements = CCJSqlParserUtil.parseStatements(sqlSchema);
            for (Statement statement : statements) {
                if (statement instanceof CreateTable createTable) {
                    tables.add(extractTableInfo(createTable));
                }
            }
        } catch (Exception e) {
            log.error("Error parsing SQL schema: {}", e.getMessage());
            throw new RuntimeException("Failed to parse SQL schema", e);
        }

        return tables;
    }

    private TableInfo extractTableInfo(CreateTable createTable) {
        String tableName = createTable.getTable().getName();
        List<ColumnInfo> columns = createTable.getColumnDefinitions()
                .stream()
                .map(this::mapToColumnInfo)
                .toList();

        // Identify primary keys
        List<String> primaryKeys = Optional.ofNullable(createTable.getIndexes())
                .orElse(List.of())
                .stream()
                .filter(index -> "PRIMARY KEY".equalsIgnoreCase(index.getType()))
                .flatMap(index -> index.getColumnsNames().stream())
                .toList();

        columns.forEach(column -> {
            if (primaryKeys.contains(column.getColumnName())) {
                column.setPrimaryKey(true);
            }
        });

        return new TableInfo(tableName, columns);
    }

    private ColumnInfo mapToColumnInfo(ColumnDefinition columnDefinition) {
        return new ColumnInfo(
                columnDefinition.getColumnName(),
                columnDefinition.getColDataType().getDataType(),
                false // primaryKey is set later based on the parsed indexes
        );
    }
}
