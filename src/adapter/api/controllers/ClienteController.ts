import { BuscaClienteFactory } from "@/core/application/use-cases-factories/clientes/BuscaClienteFactory";
import { CriaClienteFactory } from "@/core/application/use-cases-factories/clientes/CriaClienteFactory";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

class ClienteController {

	async criar(request: Request, response: Response, next: NextFunction) {
		try {
			const dados = request.body;

			const createBodySchema = z.object({
				nome: z.string().min(3).max(255),
				sobrenome: z.string().min(3).max(255).optional(),
				cpf: z.string().min(11).max(11),
			});

			const clienteToCreate = createBodySchema.parse(dados);

			const criaClienteUseCase = CriaClienteFactory();
			const { cliente } = await criaClienteUseCase.executarAsync({ ...clienteToCreate });

			return response.status(201).send(cliente);
		} catch (error) {
			next(error);
		}
	}

	async buscar(request: Request, response: Response, next: NextFunction) {
		try {
			const paramsSchema = z.object({
				cpf: z.string().min(11).max(11),
			});

			const { cpf } = paramsSchema.parse(request.params);

			const buscaClienteUseCase = BuscaClienteFactory()
			const { cliente } = await buscaClienteUseCase.executarAsync({ cpf });

			return response.status(200).json(cliente);
		} catch (error) {
			next(error);
		}
	}
}

export { ClienteController };
