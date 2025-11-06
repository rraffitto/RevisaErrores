USE [Dobida]
GO

DECLARE	@return_value int

EXEC	@return_value = [dbo].[SP_Embera_Español_RelacionIdiomas]
		@palabra = N'A'

SELECT	'Return Value' = @return_value

GO
