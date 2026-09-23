// @flow strict

/**
 * Cabeçalho padrão das seções: linha divisória em degradê, título e uma
 * "linha de comando" logo abaixo. Antes cada seção montava o seu à mão e
 * duas delas usavam um estilo diferente do resto.
 */
function SectionHeader({ title, command, icon: Icon, as: Tag = 'h2' }) {
  return (
    <>
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary-purple to-transparent" />
        </div>
      </div>

      <div className="flex flex-col items-center my-8 lg:py-4 gap-2">
        <Tag className="text-2xl lg:text-4xl font-extrabold tracking-widest text-white uppercase flex items-center gap-3 text-center">
          {Icon && <Icon className="text-primary-cyan" aria-hidden="true" />}
          {title}
          {Icon && <Icon className="text-primary-purple" aria-hidden="true" />}
        </Tag>
        {command && (
          <p className="text-primary-cyan font-mono text-sm text-center">
            <span className="text-gray-600">$</span> {command}
            <span className="ml-0.5 inline-block w-[7px] h-[14px] align-middle bg-primary-cyan animate-caret" />
          </p>
        )}
      </div>
    </>
  );
}

export default SectionHeader;
